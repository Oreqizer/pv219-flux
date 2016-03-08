import moment from "moment";
import { Map } from "immutable";
// consts
import { events } from "../../../consts/events";
// utils
import * as log from "../../../tools/log";

const { STORE_CHANGE } = events;

export default class {

    constructor($rootScope) {
        "ngInject";

        this.$rootScope = $rootScope;
        this.clean = Map();
        this.state = Map();
    }

    addStore(name: string, store: Object) {

        if (this.state.get(name)) {
            throw new Error("Store with this name already exists.");
        }

        this.state = this.state.set(name, store);
        this.clean = this.clean.set(name, store);

    }

    set(where: string, object: any) {
        try {

            if (typeof this.state.get(where) !== "undefined") {

                log.log(`OBJECT CHANGED: ${where} - ${moment().format("HH:mm:ss")}`);

                this.state = this.state.set(where, object);

                this.$rootScope.$emit(STORE_CHANGE, where);

            } else {
                log.warn("Tried to set a non-existent store property", where);
            }

        } catch (err) {
            log.warn("Error setting store", where, object);
            log.error(err);
        }
    }

    setIn(path: Array<string>, object: any) {
        try {

            if (typeof this.state.getIn(path) !== "undefined") {

                log.log(`OBJECT CHANGED: ${path.join(" >> ")} - ${moment().format("HH:mm:ss")}`);

                this.state = this.state.setIn(path, object);

                this.$rootScope.$emit(STORE_CHANGE, path.join("."));

            } else {
                log.warn("Tried to set a non-existent store property", path);
            }

        } catch (err) {
            log.warn("Error setting store", path, object);
            log.error(err);
        }
    }

    get(where: string) {
        return this.state.get(where);
    }

    getIn(path: Array<string>) {
        return this.state.getIn(path);
    }

}

