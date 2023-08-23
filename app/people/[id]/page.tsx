

import { NextPage } from "next";
import Image from "next/image";
import styles from "./Actor.module.css";
import Link from "next/link";
import ActorsComp from "@/components/ActorsComp";
import {BsTwitter} from "react-icons/bs";
import {BsInstagram} from "react-icons/bs";

//fetch api calls

const fetchActorData = async (tmdbid: number) => {
  const actorResponse = await fetch(
    `https://api.themoviedb.org/3/person/${tmdbid}?api_key=d308de6f3b996ae3b334cbb6527cffc7&append_to_response=combined_credits,external_ids`
  );
  if (!actorResponse.ok) {
    console.log("Failed");
  }
  return await actorResponse.json();
};

//Main Function
const ActorPage: NextPage<{ params: { id: number } }> = async  ({ params }) => {

const actorData = await fetchActorData(params.id);

  //data assignment
  const name = actorData?.name;
  const known_for = actorData?.known_for_department;
  const profile_photo = `https://image.tmdb.org/t/p/original/${actorData.profile_path}`;
  const dob = new Date(actorData?.birthday).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const place_of_birth = actorData?.place_of_birth;
  const bio = actorData?.biography;
  const job = known_for === "Acting"
  ? "Actor"
  : known_for === "Directing"
  ? "Director"
  : known_for === "Writing" || known_for === "Story"
  ? "Writer"  : known_for === "Production" ?  "Producer"
  : "Cinema"


  

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{`${job} - Profile`}</h1>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={profile_photo}
            alt={`${name} - photo`}
            height={384}
            width={256}
          />
        </div>
        <div className={styles.textContainer}>
        <div className={styles.info}>
          <div className={styles.question}>Name:</div>
          <div className={styles.answer}>{name}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.question}>Job:</div>
          <div className={styles.answer}>
            {job}
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.question}>Date of Birth:</div>
          <div className={styles.answer}>{dob}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.question}>Place of Birth:</div>
          <div className={styles.answer}>{place_of_birth}</div>
        </div>
        <Link href={`https://www.instagram.com/${actorData.external_ids.instagram_id}/`}><BsInstagram size="2.5em"  className={styles.reactIcons} /></Link>
        <Link href={`https://www.twitter.com/${actorData.external_ids.twitter_id}/`}><BsTwitter size="2.5em"  className={styles.reactIcons} /></Link>
        <div className={styles.bio}>
          <pre>{bio}</pre>
        </div>
        </div>
      </div>
      <div><ActorsComp movieData={actorData.combined_credits}  socialID={actorData.external_ids}/></div>
    </div>
  );
};

export default ActorPage;
