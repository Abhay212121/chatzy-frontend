import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import { UserContext } from "../context/UserContext";

export function Sidebar() {
  const { groupId } = useParams();
  const [groupName, setGroupName] = useState("");
  const [desc, setDesc] = useState("");

  const { activeUsers, setActiveUsers } = useContext(UserContext);

  useEffect(() => {
    switch (groupId) {
      case "1":
        setGroupName("General");
        setDesc("Talk about anything and everything.");
        break;
      case "2":
        setGroupName("Stoicism");
        setDesc("Share calm, clarity, and stoic ideas.");
        break;
      case "3":
        setGroupName("Life Vision");
        setDesc("Discuss your goals and purpose.");
        break;
      case "4":
        setGroupName("Emotional Resilience");
        setDesc("Talk strength, bounce-back, and balance.");
        break;
      case "5":
        setGroupName("Growth Mindset");
        setDesc("Chat to level up your thinking.");
        break;

      default:
        break;
    }
  }, [groupId]);

  useEffect(() => {
    setActiveUsers([]);

    const handleActiveUsersData = (data) => {
      console.log(data);
      setActiveUsers(data);
    };

    socket.on("active-users", handleActiveUsersData);

    return () => socket.off("active-users", handleActiveUsersData);
  }, [groupId]);

  return (
    <div className="w-full md:w-90 bg-fuchsia-500 h-fit md:h-full">
      <div className="flex items-center flex-col justify-center px-4 md:px-0 py-8 gap-4 md:gap-10">
        <div className="flex flex-col gap-2">
          <p className="font-cursive text-white text-2xl xl:text-3xl border-b-2 text-wrap px-4 mx-auto">
            {groupName}
          </p>
          <p className="font-chatContent text-white text-lg  text-wrap px-2 text-center">
            {desc}
          </p>
        </div>
        <div>
          <p className="font-cursive text-white text-2xl lg:text-3xl border-b-2 text-wrap px-4 mx-auto mb-2 w-fit">
            Active:
          </p>
          <div className="flex flex-wrap md:flex-nowrap md:flex-col ">
            {activeUsers?.map((user) => {
              return (
                <p
                  key={user.userId}
                  className="font-cursive text-white text-2xl  text-wrap px-2 text-center"
                >
                  {user.userNickname}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
