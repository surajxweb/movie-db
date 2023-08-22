import { NextPage } from "next";
import Image from "next/image";
import styles from "./Actor.module.css";
import Link from "next/link";

//fetch api calls

const fetchActorData = async (id: number) => {
  const actorResponse = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=d308de6f3b996ae3b334cbb6527cffc7&append_to_response=combined_credits`
  );
  if (!actorResponse.ok) {
    console.log("Failed");
  }
  return await actorResponse.json();
};

//Main Function

const ActorPage: NextPage<{ params: { id: number } }> = async ({ params }) => {
  // api calls
  const actorData = await fetchActorData(params.id);
  console.log(actorData);

  //data assignment
  const name = actorData.name;
  const known_for = actorData.known_for_department;
  const profile_photo = `https://image.tmdb.org/t/p/original/${actorData.profile_path}`;
  const dob = new Date(actorData.birthday).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const pop = actorData.place_of_birth;
  const bio = actorData.biography;
  const website = actorData.homepage;

  return (
    <div>
      <div>
        <Image
          src={profile_photo}
          alt={`${name} - photo`}
          height={384}
          width={256}
        />
      </div>
      <div>
        <div>{name}</div>
        <div>{dob}</div>
        <div>{bio}</div>
        <div>{known_for}</div>
        <div></div>
      </div>
    </div>
  );
};

export default ActorPage;
