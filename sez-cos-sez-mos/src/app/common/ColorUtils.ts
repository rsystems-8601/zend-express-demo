export class ColorUtils {
    private static colors: Array<string> = [
        "bgm-blue",
        "bgm-red",
        "bgm-purple",
        "bgm-lightblue",
        "bgm-cyan",
        "bgm-teal",
        "bgm-green",
        "bgm-lightgreen",
        "bgm-lime",
        "bgm-yellow",
        "bgm-amber",
        "bgm-orange",
        "bgm-gray",
        "bgm-bluegray",
        "bgm-indigo",
        "bgm-pink",
        "bgm-brown"
    ];

    static getColorCodeById(id: number): string {
        return this.colors[id % this.getColorsCount()];
    }

    static getColorsCount(): number {
        return this.colors.length;
    }
}   