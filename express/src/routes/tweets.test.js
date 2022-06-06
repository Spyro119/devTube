const Twit = require("twit");
const { tweetTrending } = require("./tweets");

jest.mock("Twit");

const [twitter] = Twit.mock.instances;
twitter.post
  .mockName("post")
  .mockReturnValue(Promise.resolve("OK"));

afterEach(() => {
  jest.clearAllMocks();
});


test("tweet a trending video", async () => {
  const video = {
    "likes": 1501,
    "objectID": "AEtCEt44vlE",
    "speakerTwitters": [
      "eduardsi"
    ],
    "title": "Beyond Software Craftsmanship"
  }

  const watchingNow = 10
  const comments = 3400
  await tweetTrending(video, watchingNow, comments);
  expect(twitter.post).toHaveBeenCalledWith("statuses/update", {
    status: `@eduardsi:
📈 Your talk "Beyond Software Craftsmanship" is trending on DevTube:
❤️ 1K likes
✍️ 3K comments 
📺 10 watching now

https://dev.tube/video/AEtCEt44vlE`,
  })
});