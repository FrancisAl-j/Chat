import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Plus from "../assets/plus.svg";
import { useAppDispatch } from "../redux/Hooks";
import { CreateRoomThunk } from "../redux/thunks/roomThunk";

const CreateChat = () => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement>(null);

  const [tagsData, setTagsData] = useState<string[]>([]);
  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    tags: [] as string[],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setRoomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    setTagsData((prev) =>
      checked ? [...prev, value] : prev.filter((tag) => tag !== value)
    );
  };

  useEffect(() => {
    setRoomData((prev) => ({
      ...prev,
      tags: tagsData,
    }));
  }, [tagsData]);

  const handleCreateRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(CreateRoomThunk(roomData));

    if (CreateRoomThunk.fulfilled.match(result)) {
      // Reset form
      setTagsData([]);
      setRoomData({ name: "", description: "", tags: [] });

      // Close modal
      modalRef.current?.close();
    }
  };

  return (
    <>
      <div
        onClick={() => modalRef.current?.showModal()}
        className="w-full shadow-lg p-2 grid place-items-center cursor-pointer rounded-lg hover:bg-gray-300"
      >
        <img src={Plus} alt="Add" className="aspect-square w-10" />
      </div>

      <dialog ref={modalRef} id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" className="mb-4">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Create a New Party Chat</h3>
          <form onSubmit={handleCreateRoom} className="flex flex-col gap-4">
            <fieldset className="w-full">
              <legend className="font-semibold text-sm mb-1">Party Name</legend>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Type here"
                value={roomData.name}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend className="font-semibold text-sm mb-1">
                Description
              </legend>
              <textarea
                name="description"
                className="textarea textarea-bordered h-24 w-full"
                rows={6}
                value={roomData.description}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset>
              <legend className="font-semibold text-sm mb-1">Tags</legend>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chat"
                  value="chat"
                  onChange={handleTagChange}
                  checked={tagsData.includes("chat")}
                  className="checkbox checkbox-neutral"
                />
                <label htmlFor="chat" className="text-lg">
                  Chat
                </label>
              </div>
            </fieldset>

            <button className="btn btn-outline btn-success mt-2" type="submit">
              Create
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CreateChat;
