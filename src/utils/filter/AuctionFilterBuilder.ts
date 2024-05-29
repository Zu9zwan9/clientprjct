export class AuctionFilterBuilder {

    private action: string = "";

    private category: string = "";

    private brand: string = "";

    private model: string = "";

    private yearFrom: number = 0;

    private yearTo: number = -1

    private carMileageFrom: number = 0;

    private carMileageTo: number = -1

    private priceFrom: number = 0;

    private priceTo: number = -1;

    private type: string = "";

    public setAction(action: string) {
        this.action = action;

        return this;
    }

    public getAction() {
        return this.action;
    }

    public setCategory(value: string) {
        this.category = value;

        return this;
    }

    public getCategory() {
        return this.category;
    }

    public setBrand(value: string) {
        this.brand = value?.length ? value : "";
        return this;
    }

    public getBrand() {
        return this.brand;
    }

    public setModel(value: string) {
        this.model = value?.length ? value : "";
        return this;
    }

    public getModel() {
        return this.model;
    }

    public setType(value: string) {
        this.type = value;

        return this;
    }

    public getType() {
        return this.type;
    }

    public setYearFrom(value: number) {
        this.yearFrom = !isNaN(value) ? value : 0;

        return this;
    }

    public getYearFrom() {
        return this.yearFrom;
    }

    public setYearTo(value: number) {
        this.yearTo = !isNaN(value) ? value : -1;


        return this;
    }

    public getYearTo() {
        return this.yearTo;
    }

    public setCarMileageFrom(value: number) {
        this.carMileageFrom = !isNaN(value) ? value : 0;

        return this;
    }

    public getCarMileageFrom() {
        return this.carMileageFrom;
    }

    public setCarMileageTo(value: number) {
        this.carMileageTo = !isNaN(value) ? value : -1;

        return this;
    }

    public getCarMileageTo() {
        return this.carMileageTo;
    }

    public setPriceFrom(value: number) {

        this.priceFrom = !isNaN(value) ? value : 0;

        return this;
    }

    public getPriceFrom() {
        return this.priceFrom;
    }

    public setPriceTo(value: number) {

        this.priceTo = !isNaN(value) ? value : -1;

        return this;
    }

    public getPriceTo() {
        return this.priceTo;
    }
}
