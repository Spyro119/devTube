const { Criteria } = require("../libs/Fastr");
const { Videos } = require("../videos");

const { fastr } = require("../fastr");

const router = require("express").Router();

router.post("/", (req, res) => {
  console.log(req.headers);
  let {
    query = '',
    page = 1,
    refinement,
    sortOrder = 'satisfaction',
    excludes
  } = req.body

  page--;

  const { channels, ids, speakers } = refinement;

  const criteria = new Criteria()
    .excludeIds(excludes)
    .limitFts(query)
    .limitChannels(channels)
    .limitSpeakers(speakers)
    .limitIds(ids)

  const hitsIds = fastr.search(criteria, sortOrder.replace("-", ""))

  const hitsPerPage = 20;
  const from = page * hitsPerPage;
  const to = from + hitsPerPage;

  new Videos(hitsIds.slice(from, to))
    .fetch()
    .then(hits => {
      const pages = Math.min(10, Math.ceil(hitsIds.length / hitsPerPage));
      res.json(
        {
          hits,
          pages,
        }
      )
    })
    .catch(error => res.status(500).send(error));
});

module.exports = router;
