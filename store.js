var items = [];

var notifyComponents = function() {
  $(ListStore).trigger('storeHasChanged');
};

var findItemById = function(id) {
  return items.filter(function(item) {
    return item.id === id;
  })[0];
},

ListStore = {

  getItems: function() {
    return items;
  },

  loadItems: function(listName) {
    var loadRequest = $.ajax({
      type: 'GET',
      url: "https://listalous.herokuapp.com/lists/"+ listName + "/"
    });

    loadRequest.done(function(dataFromServer) {
      items = dataFromServer.items;
      notifyComponents();
    });
  },


  
  addItem: function(itemDescription) {
    var creationRequest = $.ajax({
      type: 'POST',
      url: "http://listalous.herokuapp.com/lists/meghanhade/items",
      data: { description: itemDescription, completed: false }
    });

    creationRequest.done(function(itemDataFromServer) {
      items.push(itemDataFromServer);
      notifyComponents();
    });
  },

  deleteItem: function(itemID) {
    var item = findItemById(itemID);

    var deletionRequest = $.ajax({
      type: 'DELETE',
      url: "http://listalous.herokuapp.com/lists/meghanhade/items/" + itemID,
    });

    deletionRequest.done(function(deletedItemData) {
      var indexOfItem = items.indexOf(item);
      console.log(items);
      console.log(items.indexOfItem);
      items.splice(items.indexOfItem, 1);
      console.log(items);
      notifyComponents();
    });
  },

  toggleCompleteness: function(itemId) {
    var item = findItemById(itemId);
    var currentCompletedValue = item.completed;

    var updateRequest = $.ajax({
      type: 'PUT',
      url: "https://listalous.herokuapp.com/lists/meghanhade/items/" + itemId,
      data: { completed: !currentCompletedValue }
    });

    updateRequest.done(function(itemData) {
      item.completed = itemData.completed;
      notifyComponents();
    });
  }
};