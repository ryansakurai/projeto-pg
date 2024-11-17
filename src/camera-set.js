export class CameraSet {
    #array;
    #currentCameraIndex
    currentCamera;

    constructor() {
        this.#array = [];
    }

    addCamera(camera) {
        if(this.#array.length === 0) {
            this.currentCamera = camera;
            this.#currentCameraIndex = 0;
        }

        this.#array.push(camera);
    }

    #isOutOfBound(index) {
        return index < 0 || index >= this.#array.length;
    }

    nextCamera() {
        let index = this.#currentCameraIndex + 1;
        if(this.#isOutOfBound(index))
            index = 0;

        this.#currentCameraIndex = index;
        this.currentCamera = this.#array[index];
    }

    prevCamera() {
        let index = this.#currentCameraIndex - 1;
        if(this.#isOutOfBound(index))
            index = this.#array.length - 1;

        this.#currentCameraIndex = index;
        this.currentCamera = this.#array[index];
    }
}
