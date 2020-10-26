import { useState, useEffect } from "react";
import { useCamera } from "@ionic/react-hooks/camera";
import { useFilesystem, base64FromPath } from "@ionic/react-hooks/filesystem";
import { useStorage } from "@ionic/react-hooks/storage";
import { isPlatform } from "@ionic/react";
import {
  CameraResultType,
  CameraSource,
  CameraPhoto,
  Capacitor,
  FilesystemDirectory,
} from "@capacitor/core";
const PHOTO_STORAGE = "photos";

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

export function usePhotoGallery() {
  const { getPhoto } = useCamera();
  const [photos, setPhotos] = useState<{ [id: string]: Photo[] }>({});
  const { get, set } = useStorage();
  const { readFile, writeFile } = useFilesystem();

  useEffect(() => {
    const loadSaved = async () => {
      const photosString = await get(PHOTO_STORAGE);
      const photosPerSession = (photosString
        ? JSON.parse(photosString)
        : {}) as { [id: string]: Photo[] };
      if (!isPlatform("hybrid")) {
        for (let id in photosPerSession) {
          for (let photo of photosPerSession[id]) {
            const file = await readFile({
              path: photo.filepath,
              directory: FilesystemDirectory.Data,
            });
            photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
          }
        }
      }
      setPhotos(photosPerSession);
    };
    loadSaved();
  }, [get, readFile]);

  const takePhoto = async (id: string) => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = new Date().getTime() + ".jpeg";
    const savedFileImage = await savePicture(cameraPhoto, fileName, writeFile);

    var newPhotosForID;
    if (photos[id]) {
      newPhotosForID = [savedFileImage, ...photos[id]];
    } else {
      newPhotosForID = [savedFileImage];
    }
    const newPhotos = Object.assign({}, photos, { [id]: newPhotosForID });
    set(PHOTO_STORAGE, JSON.stringify(newPhotos));
    setPhotos(newPhotos);
  };

  const deletePic = async (id: string, picture: Photo) => {
    //TODO
  };
  return {
    photos,
    takePhoto,
    deletePic,
  };
}

const savePicture = async (
  photo: CameraPhoto,
  fileName: string,
  writeFile: Function
): Promise<Photo> => {
  const base64Data = await base64FromPath(photo.webPath!);
  const savedFile = await writeFile({
    path: fileName,
    data: base64Data,
    directory: FilesystemDirectory.Data,
  });
  if (isPlatform("hybrid")) {
    // Display the new image by rewriting the 'file://' path to HTTP
    // Details: https://ionicframework.com/docs/building/webview#file-protocol
    return {
      filepath: savedFile.uri,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    };
  } else {
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  }
};
