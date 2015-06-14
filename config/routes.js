module.exports.routes = {
  "post /entry": {
    "target": "EntryController.post_create"
  },
  "get /entry": {
    "target": "EntryController.get_find"
  },
  "get /entry/:id": {
    "target": "EntryController.get_$id",
    "skipAssets": true
  },
  "put /entry/:id": {
    "target": "EntryController.put_$id",
    "skipAssets": true
  },
  "delete /entry/:id": {
    "target": "EntryController.delete_$id",
    "skipAssets": true
  }
};