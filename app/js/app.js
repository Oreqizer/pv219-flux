import $ from "jquery";
import { Map, List } from "immutable";

// data
let data = Map({
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

// elements
const navbar = $("#li-messages-navbar");
const chats = $(".li-chat-window");

// init
navbar.data("messages", data.reduce((acc, next) =>
    acc + (next.get("unread") ? 1 : 0), 0));

navbar.text(navbar.data("messages"));

chats.each(function() {
    const chat = $(this);

    updateChat(chat.data("name"));
});

// handlers
navbar.on("click", function() {
    navbar.data("messages", 0);
    navbar.text(navbar.data("messages"));

    chats.each(function() {
        const chat = $(this);
        chat.data("unread", false);

        data = data
            .setIn([chat.data("name"), "unread"], false);

        updateChat(chat.data("name"));
    });
});

chats.on("click", function() {
    const chat = $(this);

    chat.data("unread", false);

    data = data
        .setIn([chat.data("name"), "unread"], false);

    updateChat(chat.data("name"));
    updateNavbar(); // navbar.messages--;
});

// functions
function updateNavbar() {
    navbar.data("messages", data.reduce((acc, next) =>
        acc + (next.get("unread") ? 1 : 0), 0));

    navbar.text(navbar.data("messages"));
}

function updateChat(name) {
    const chatData = data.get(name);

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

window.addMsg = (chat, msg) => {
    data = data
        .setIn([chat, "messages"], data.getIn([chat, "messages"]).push(msg))
        .setIn([chat, "unread"], true);

    updateChat(chat);
    updateNavbar();
};

