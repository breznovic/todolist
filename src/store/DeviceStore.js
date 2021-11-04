import { makeAutoObservable } from "mobx"

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Refrigerotors'},
            {id: 2, name: 'Smartphones'}
        ]
        this._brands = [
            {id: 1, name: 'Samsung'},
            {id: 2, name: 'Apple'}
        ]
        this._devices = [
            {id: 1, name: 'Samsung', price: 25000, rating: 5, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cT_1WQURqo6VfyeKk0tX8OvkWA08QD_IBA&usqp=CAU'},
            {id: 2, name: 'Samsung', price: 25000, rating: 5, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cT_1WQURqo6VfyeKk0tX8OvkWA08QD_IBA&usqp=CAU'},
            {id: 3, name: 'Samsung', price: 25000, rating: 5, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cT_1WQURqo6VfyeKk0tX8OvkWA08QD_IBA&usqp=CAU'},
            {id: 4, name: 'Samsung', price: 25000, rating: 5, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cT_1WQURqo6VfyeKk0tX8OvkWA08QD_IBA&usqp=CAU'}
        ]
        makeAutoObservable(this)
    }

setTypes(types) {
    this._types = types
}

setBrands(brands) {
    this._brands = brands
}

setDevices(devices) {
    this._devices = devices 
}

get types() {
    return this._types
}

get brands() {
    return this._brands
}

get devices() {
    return this._devices
}

}