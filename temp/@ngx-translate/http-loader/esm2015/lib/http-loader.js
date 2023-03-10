export class TranslateHttpLoader {
    constructor(http, prefix = "/assets/i18n/", suffix = ".json") {
        this.http = http;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    /**
     * Gets the translations from the server
     */
    getTranslation(lang) {
        return this.http.get(`${this.prefix}${lang}${this.suffix}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdHJhbnNsYXRlL2h0dHAtbG9hZGVyL3NyYy9saWIvaHR0cC1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFvQixJQUFnQixFQUFTLFNBQWlCLGVBQWUsRUFBUyxTQUFpQixPQUFPO1FBQTFGLFNBQUksR0FBSixJQUFJLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUEwQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQztJQUVsSDs7T0FFRztJQUNJLGNBQWMsQ0FBQyxJQUFZO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0dHBDbGllbnR9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHtUcmFuc2xhdGVMb2FkZXJ9IGZyb20gXCJAbmd4LXRyYW5zbGF0ZS9jb3JlXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlSHR0cExvYWRlciBpbXBsZW1lbnRzIFRyYW5zbGF0ZUxvYWRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHVibGljIHByZWZpeDogc3RyaW5nID0gXCIvYXNzZXRzL2kxOG4vXCIsIHB1YmxpYyBzdWZmaXg6IHN0cmluZyA9IFwiLmpzb25cIikge31cblxuICAvKipcbiAgICogR2V0cyB0aGUgdHJhbnNsYXRpb25zIGZyb20gdGhlIHNlcnZlclxuICAgKi9cbiAgcHVibGljIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8T2JqZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5wcmVmaXh9JHtsYW5nfSR7dGhpcy5zdWZmaXh9YCk7XG4gIH1cbn1cbiJdfQ==