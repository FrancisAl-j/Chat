import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Plus from "../assets/plus.svg";
import { useAppDispatch } from "../redux/Hooks";
import { CreateRoomThunk } from "../redux/thunks/roomThunk";

const CreateChat = () => {
  const dispatch = useAppDispatch();
  const [tagsData, setTagsData] = useState<string[]>([]);
  const [roomData, setRoomData] = useState({
    name: "",
    description: "",
    tags: tagsData,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setRoomData({
      ...roomData,
      [name]: value,
    });
  };

  useEffect(() => {
    setRoomData({
      ...roomData,
      tags: tagsData,
    });
  }, [tagsData]);

  // Changes for tags
  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    if (checked) {
      setTagsData((prev) => [...prev, value]);
    } else {
      setTagsData((prev) => prev.filter((tag) => tag !== value));
    }
  };

  const handleCreateRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(CreateRoomThunk(roomData));

    if (CreateRoomThunk.fulfilled.match(result)) {
      setTagsData([]);
      setRoomData({
        name: "",
        description: "",
        tags: tagsData,
      });
    }
  };

  return (
    <>
      <div
        onClick={() => {
          const modal = document.getElementById(
            "my_modal_3"
          ) as HTMLDialogElement | null;
          modal?.showModal();
        }}
        className="w-full shadow-lg p-2 grid place-items-center cursor-pointer rounded-lg hover:bg-gray-300"
      >
        <img src={Plus} alt="" className="aspect-square w-10" />
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Create a New Party Chat</h3>
          <form
            onSubmit={handleCreateRoom}
            className="w-full flex flex-col gap-2"
          >
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Party Name</legend>
              <input
                type="text"
                name="name"
                className="input w-full"
                placeholder="Type here"
                value={roomData.name}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Description</legend>
              <textarea
                name="description"
                id=""
                className="textarea h-24 w-full"
                rows={6}
                value={roomData.description}
                onChange={handleChange}
              ></textarea>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Tags</legend>

              <div>
                <div className="flex items-center gap-2 cursor-pointer">
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
              </div>
            </fieldset>
            <button className="btn btn-outline btn-success">Create</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CreateChat;
