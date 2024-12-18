package com.metahive.CamTrackerSever.controllers;


import org.bytedeco.javacv.FrameGrabber;
import org.bytedeco.javacv.Java2DFrameUtils;
import org.bytedeco.javacv.OpenCVFrameConverter;
import org.bytedeco.javacv.OpenCVFrameGrabber;
import org.bytedeco.opencv.opencv_core.Mat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
public class WebcamController{

    @ResponseBody
    @RequestMapping(value = "/capture" ,method =  RequestMethod.GET , produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] capture() throws IOException {
        // This cod will grab the image from default webcam (device number 0)
        // We can change the device by changing the device number if more than one camera are added to the device

        Mat grabbedImage;

        try (FrameGrabber grabber = new OpenCVFrameGrabber(0)){
            grabber.start();
            try(OpenCVFrameConverter.ToMat converter = new OpenCVFrameConverter.ToMat()){
                grabbedImage = converter.convert(grabber.grab());
            }
            grabber.stop();
        }

        BufferedImage image = Java2DFrameUtils.toBufferedImage(grabbedImage);
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        javax.imageio.ImageIO.write(image, "jpg", os);

        return os.toByteArray();
    }
}
