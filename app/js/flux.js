import $ from "jquery";
import { Map, List } from "immutable";

// data
const data = Map({
    chat1: Map({
        messages: List(["Hello", "this is dog"]),
        unread: true
    }),
    chat2: Map({
        messages: List(
            ["mom's spaghetti", "lingscars.com is best website", "wow"]
        ),
        unread: true
    })
});

class Store {

    constructor() {
        this.callbacks = {};
        this.state = data;
    }

    dispatch(event, change) {
        console.log(`EVENT: ${event.name}`);
        console.log("STATE:", change);

        if (this.callbacks[event.name]) {
            this.state = change;
            this.callbacks[event.name].forEach(cb => cb(event.payload));
        } else {
            console.error("No such event:", event);
        }
    }

    subscribe(name, cb) {
        if (!this.callbacks[name]) {
            this.callbacks[name] = [cb];
        } else {
            this.callbacks[name].push(cb);
        }
    }

};

// elements
const navbar = $("#li-messages-navbar");
const chats = $(".li-chat-window");

// init
const store = new Store();

store.subscribe("chat", updateChat);
store.subscribe("chat", updateNavbar);

updateNavbar();
chats.each(function() {
    const chat = $(this);

    updateChat(chat.data("name"));
});

// handlers
navbar.on("click", function() {

    chats.each(function() {
        const chat = $(this);

        store.dispatch({
            name: "chat",
            payload: chat.data("name")
        }, store.state.setIn([chat.data("name"), "unread"], false));
    });

});

chats.on("click", function() {

    const chat = $(this);

    store.dispatch({
        name: "chat",
        payload: chat.data("name")
    }, store.state.setIn([chat.data("name"), "unread"], false));

});

// functions
function updateNavbar() {

    navbar.data("messages", store.state.reduce((acc, next) =>
    acc + (next.get("unread") ? 1 : 0), 0));

    navbar.text(navbar.data("messages"));

}

function updateChat(name) {

    const chatData = store.state.get(name);

    let chat = null;
    chats.each(function() {
        const self = $(this);
        if (self.data("name") === name) {
            chat = self;
            return false;
        }
    });

    chat.children(".li-chat-messages").empty();
    chat.data("unread", chatData.get("unread"));

    const color = chatData.get("unread") ?
        "#ffc" : "#fff";

    chat.css({ background: color });

    chatData.get("messages").forEach(msg => {
        chat
            .children(".li-chat-messages")
            .append(`<span class="li-message">${msg}</span>`);
    });

}

// console utils
window.addMsg = (chat, msg) => {

    store.dispatch({
        name: "chat",
        payload: chat
    }, store.state
        .setIn([chat, "messages"], store.state.getIn([chat, "messages"]).push(msg))
        .setIn([chat, "unread"], true));

};

