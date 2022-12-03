const { Food } = require('./food');

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        // Picks up an item from the current room into the player's inventory
        // Your code here

        let roomItem = this.currentRoom.items
        for (let i = 0; i < roomItem.length; i++) {
            let item = roomItem[i];

            if (item.name === itemName) {
                this.items.push(item);
                roomItem.splice(i,1)
            }
        }
    }

    dropItem(itemName) {
        // Drops an item the player is holding into their current room
        // Your code here

        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];

            if (item.name === itemName) {
                this.currentRoom.items.push(item)
                this.items.splice(i,1)

            }
        }

    }

    eatItem(itemName) {
        // Allow the player to eat food items, but not non-food items
        // Your code here

        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.name === itemName && item instanceof Food) {
                this.items.splice(i,1)
            }
        }
    }

    getItemByName(name) {
        // Retrieves an item from a player's inventory by item name
        // Your code here
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.name === name) {
                return item
            }
        }
    }
}

module.exports = {
  Player,
};
