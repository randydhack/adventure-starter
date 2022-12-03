const { Room } = require('./room');
const { Item } = require('./item');
const { Food } = require('./food');
const { items } = require('../data/world-data');

class World {
    constructor() {
        this.rooms = {};
    }

    loadWorld(worldData) {

        const roomList = worldData.rooms;
        const itemList = worldData.items;

        // Instantiate new room objects
        // Get name, id and description from room data
        for (let i = 0 ; i < roomList.length ; i++) {

            let roomData = roomList[i];
            let newRoom = new Room(roomData.name, roomData.description);

            this.rooms[roomData.id] = newRoom;
        }

        // Connect rooms by ID
        // Note that all rooms must be created before they can be connected
        for (let i = 0 ; i < roomList.length ; i++) {

            let roomID = roomList[i].id;
            let roomConnections = roomList[i].exits;

            for (const direction in roomConnections) {
                let connectedRoomID = roomConnections[direction];
                let roomToConnect = this.rooms[connectedRoomID];
                this.rooms[roomID].connectRooms(direction, roomToConnect);
            }

        }

        // Instantiate items using data stored in the itemList variable
            // A non-food item should be instantiated as an instance of the `Item` class
            // A food item should be instantiated as an instance of the `Food` class

        for (let i = 0; i < itemList.length; i++) {
            let itemToPush;

            itemList[i].isFood
            ? itemToPush = new Food(itemList[i].name, itemList[i].description)
            : itemToPush = new Item(itemList[i].name, itemList[i].description)
            this.rooms[itemList[i].room].items.push(itemToPush);
        }
    }
}

module.exports = {
  World,
};
