import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from "@capacitor/core";
const { deleteFile, getUri, readFile, writeFile } = useFilesystem();

export function usePhotoGallery() {

    const { getPhoto } = useCamera();

    const takePhoto = async () => {
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });
    };

    return {
        takePhoto
    };
}

const savePicture = async (photo: CameraPhoto, fileName: string) => {
    const base64Data = await base64FromPath(photo.webPath!);
    const savedFile = await writeFile({
        path: fileName,
        data: base64Data,
        directory: FilesystemDirectory.Data
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
        filepath: fileName,
        webviewPath: photo.webPath
    };
};