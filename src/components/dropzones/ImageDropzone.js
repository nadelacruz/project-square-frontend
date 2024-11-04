import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';

import { MdOutlineImageSearch } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

import Dropzone from 'react-dropzone';

import { useIdentity } from "../../hooks/useIdentity";

const ImageDropzone = ({ onImageDrop, initialImage, index }) => {

    const { useCamera, webcamRef, toggleCamera } = useIdentity();

    const emptyPreview = (
        <>
            <span className="fs-6 w-75 text-center mb-3">{(index < 1)? 'Default Profile' : `Face Image ${index + 1}`}</span>
            <MdOutlineImageSearch size={100} />
            <span className="small w-75 text-center mb-3">Click to browse, drop a photo, or take one using camera.</span>
        </>
    );

    const [isNotNull, setIsNotNull] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [coverPreview, setcoverPreview] = useState(emptyPreview);

    useEffect(() => {
        renderEmptyPreview();
        renderImagePreview();
        if (useCamera) renderCameraPreview();
    }, [index]);

    useEffect(() => {
        if (useCamera) {
            renderCameraPreview()
        } else {
            renderEmptyPreview();
            renderImagePreview();
        }
    }, [useCamera]);

    const renderEmptyPreview = () => {
        setcoverPreview(emptyPreview);
    };

    const renderImagePreview = () => {
        if (initialImage) {
            setcoverPreview(
                <img src={initialImage} alt="Cover Preview" title={`${initialImage}}`} />
            );
            setIsNotNull(true);
        }
    };

    const renderCameraPreview = () => {
        setcoverPreview(
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam-container"
            />
        );
    };

    const handleImageDrop = (acceptedFiles) => {
        if (useCamera) toggleCamera();

        if (acceptedFiles.length > 5) {
            toast.error(`Too many files. Please select only five (5) face images.`, {
                autoClose: 3000,
                position: 'bottom-center'
            });
            return;
        }

        let filteredFiles = [];
        acceptedFiles.map((file) => {
            if (!file.type.startsWith('image/')) {
                toast.error(`Invalid file. Please select an image file as a face image.`, {
                    autoClose: 3000,
                    position: 'bottom-center'
                });
            } else {
                filteredFiles.push(file);
            }
        });

        onImageDrop(filteredFiles);
        setcoverPreview(
            <img src={URL.createObjectURL(filteredFiles[0])} alt="Cover Preview" title={`${acceptedFiles[0].path}`} />
        );
        setIsNotNull(true);
    };

    return (
        <div className="upload-thumbnail-container">
            <Dropzone
                onDrop={acceptedFiles => handleImageDrop(acceptedFiles)}
            >
                {({ getRootProps, getInputProps, isDragActive }) => (
                    <div
                        {...getRootProps({})}
                        className={`upload-cover-dropzone ${(isDragActive) ? "active" : ""}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <input {...getInputProps()} />
                        {(isDragActive && isNotNull) && (
                            <div
                                className="drag-active"
                            >
                                <RiImageAddFill size={100} />
                                <span className="fs-6 fw-bold">Change face image</span>
                            </div>
                        )}

                        {(isHovered && isNotNull) && (
                            <div
                                className="hover-active"
                            >
                                <FaRegEdit size={100} />
                                <span className="fs-6 fw-bold">Choose another face image</span>
                            </div>
                        )}

                        {coverPreview}
                    </div>
                )}
            </Dropzone>
        </div>
    );
}

export default ImageDropzone;
