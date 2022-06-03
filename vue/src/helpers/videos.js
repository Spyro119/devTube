import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(relativeTime);

export function avatar(video, speakerIndex) {
  const customAvatars = {
    seriouspony: "/speakers/seriouspony.png",
    spchteach: "/speakers/matt_abrahams.jpg",
    jrhatmvdirona: "/speakers/james_hamilton.png",
    guysteele: "/speakers/guy_steele.jpg",
    ryanmdahl: "/speakers/ryan_dahl.png",
    jbrains: "/speakers/jbrains.jpg",
    russolsen: "/speakers/russ_olsen.jpg"
  };
  const speaker = video.speakerTwitters[speakerIndex];
  return (
    customAvatars[speaker] || "https://dossier.glitch.me/avatar/" + speaker
  );
}

export function addedAgo(video) {
  return "added " + dayjs(video.submissionDate).fromNow();
}

export function expiresIn() {
  const expires = dayjs
    .utc()
    .endOf("week")
    .fromNow();
  if (expires.includes("ago")) {
    return "soon";
  } else {
    return expires;
  }
}
