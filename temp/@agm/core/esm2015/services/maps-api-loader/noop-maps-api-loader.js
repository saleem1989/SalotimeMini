/**
 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Google Maps API script gets loaded first on the page.
 */
export class NoOpMapsAPILoader {
    load() {
        if (!window.google || !window.google.maps) {
            throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
        }
        return Promise.resolve();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9vcC1tYXBzLWFwaS1sb2FkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbm9vcC1tYXBzLWFwaS1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsSUFBSTtRQUNGLElBQUksQ0FBRSxNQUFjLENBQUMsTUFBTSxJQUFJLENBQUUsTUFBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FDWCxnRkFBZ0YsQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gJy4vbWFwcy1hcGktbG9hZGVyJztcblxuLyoqXG4gKiBXaGVuIHVzaW5nIHRoZSBOb09wTWFwc0FQSUxvYWRlciwgdGhlIEdvb2dsZSBNYXBzIEFQSSBtdXN0IGJlIGFkZGVkIHRvIHRoZSBwYWdlIHZpYSBhIGA8c2NyaXB0PmBcbiAqIFRhZy5cbiAqIEl0J3MgaW1wb3J0YW50IHRoYXQgdGhlIEdvb2dsZSBNYXBzIEFQSSBzY3JpcHQgZ2V0cyBsb2FkZWQgZmlyc3Qgb24gdGhlIHBhZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb09wTWFwc0FQSUxvYWRlciBpbXBsZW1lbnRzIE1hcHNBUElMb2FkZXIge1xuICBsb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghKHdpbmRvdyBhcyBhbnkpLmdvb2dsZSB8fCAhKHdpbmRvdyBhcyBhbnkpLmdvb2dsZS5tYXBzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0dvb2dsZSBNYXBzIEFQSSBub3QgbG9hZGVkIG9uIHBhZ2UuIE1ha2Ugc3VyZSB3aW5kb3cuZ29vZ2xlLm1hcHMgaXMgYXZhaWxhYmxlIScpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cbiJdfQ==