import { NextPage } from "next";
import Image from "next/image";
import styles from "./Actor.module.css";
import Link from "next/link";
import ActorsComp from "@/components/ActorsComp";
import { RiTwitterXLine } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";

//fetch api calls

const fetchActorData = async (tmdbid: number) => {
  try {
    const actorResponse = await fetch(
      `https://api.themoviedb.org/3/person/${tmdbid}?api_key=${process.env.TMDBchabi}&append_to_response=combined_credits,external_ids,images`,
      { next: { revalidate: 3600 } }
    );
    if (!actorResponse.ok) {
      console.log("Failed");
    }
    return await actorResponse?.json();
  } catch (e) {
    console.log("Failed ", e);
  }
};

//Main Function
const ActorPage: NextPage<{ params: { id: number } }> = async ({ params }) => {
  const actorData = await fetchActorData(params.id);

  //data assignment
  const name = actorData?.name;
  const known_for = actorData?.known_for_department;
  const profile_photo = `https://image.tmdb.org/t/p/original/${actorData?.profile_path}`;
  const dob = new Date(actorData?.birthday).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const place_of_birth = actorData?.place_of_birth;
  const bio = actorData?.biography;
  const job =
    known_for === "Acting"
      ? "Actor"
      : known_for === "Directing"
      ? "Director"
      : known_for === "Writing" || known_for === "Story"
      ? "Writer"
      : known_for === "Production"
      ? "Producer"
      : "Cinema";

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{`${job} - Profile`}</h1>
      {!actorData && (
        <div style={{ fontSize: "20px", margin: "20px 0" }}>
          Person Not Found!
        </div>
      )}
      {actorData && (
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              unoptimized
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
              <div className={styles.answer}>{job}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.question}>Date of Birth:</div>
              <div className={styles.answer}>{dob}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.question}>Place of Birth:</div>
              <div className={styles.answer}>{place_of_birth}</div>
            </div>
            {actorData?.external_ids?.instagram_id && (
              <Link
                target='_blank'
                href={`https://www.instagram.com/${actorData?.external_ids?.instagram_id}/`}
              >
                <BsInstagram size='2.5em' className={styles.reactIcons} />
              </Link>
            )}
            {actorData?.external_ids?.twitter_id && (
              <Link
                target='_blank'
                href={`https://www.twitter.com/${actorData.external_ids.twitter_id}/`}
              >
                <RiTwitterXLine size='2.5em' className={styles.reactIcons} />
              </Link>
            )}
            <div className={styles.bio}>
              <pre>{bio}</pre>
            </div>
          </div>
        </div>
      )}
      <div>
        {actorData && (
          <ActorsComp
            creditsData={
              job === "Actor"
                ? actorData?.combined_credits?.cast
                : actorData?.combined_credits?.crew
            }
            socialID={actorData?.external_ids}
            imageData={actorData?.images?.profiles}
          />
        )}
      </div>
    </div>
  );
};

export default ActorPage;
