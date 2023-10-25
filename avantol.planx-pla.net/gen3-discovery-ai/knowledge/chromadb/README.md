Put Chromadb persisted knowledge collections here.

You can run gen3-discovery-ai locally, store stuff in the knowledge library, and then rsync the persisted collection.

Just make sure the collection name locally (e.g. the `topic` name) is the same locally and remotely.

Example syncing local persisted knowledge library to a development environment. You want to move these to a `gen3-discovery-ai/knowledge/chromadb` folder wherever the `manifest.json` is.

```bash
rsync -re ssh --progress ~/repos/gen3-discovery-ai/knowledge/ avantol@cdistest_dev.csoc:~/cdis-manifest/avantol.planx-pla.net/gen3-discovery-ai/knowledge/chromadb
```
