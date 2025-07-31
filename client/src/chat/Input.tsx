import { useEffect, useRef, useState, type FormEvent } from "react";
import Send from "../assets/send.svg";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import type { MessageData } from "../redux/Interfaces";
import { CreateMessageThunk } from "../redux/thunks/messageThunk";
import { app } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import Img from "../assets/add-imgD.svg";

const Input = () => {
  const dispatch = useAppDispatch();
  const { roomId } = useAppSelector((state) => state.room);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  // "useEffect" to upload the handleFileUpload
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // HANDLING FILE UPLOADS ON FIREBASE
  const handleFileUpload = async (file: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    try {
      const uploadSnapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(uploadSnapshot.ref);

      setImage(downloadUrl);
    } catch (error) {
      console.log(error);
    }
  };

  // REMOVING THE IMAGE AND DELETING IT FROM FIREBASE TOO
  const removeImage = async (filepath: string | undefined) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, filepath);

    try {
      await deleteObject(storageRef);
      setImage(undefined);
      //setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messageData: MessageData = {
      message,
      image,
      roomId,
    };

    const result = await dispatch(CreateMessageThunk(messageData));

    if (CreateMessageThunk.fulfilled.match(result)) {
      setMessage("");
      setImage(undefined);
      setFile(null);
    }
  };
  return (
    <form onSubmit={handleCreateMessage} className="w-full">
      {image && (
        <div className="relative ml-auto bg-black w-20 h-20 mx-2">
          <img src={image} alt="" className="aspect-square w-20" />
          <span
            className="indicator-item badge badge-secondary cursor-pointer top-[-10px] absolute left-[-10px]"
            onClick={() => removeImage(image)}
          >
            ✕
          </span>
        </div>
      )}
      <div className="w-full flex items-center">
        <input
          type="text"
          className="p-1 w-full border-2 rounded-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />

        {/* Icon image for uploading an image */}
        <div>
          <img
            src={Img}
            onClick={() => fileRef.current?.click()}
            alt="Image icon"
            className="aspect-square w-8 cursor-pointer"
          />

          <input
            type="file"
            name=""
            id=""
            accept="image/*"
            ref={fileRef}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
              }
            }}
            hidden
          />
        </div>
        <button disabled={!message}>
          <img
            src={Send}
            alt=""
            className={`aspect-square w-8 right-1  ${
              message || image
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-60"
            }`}
          />
        </button>
      </div>
    </form>
  );
};

export default Input;
