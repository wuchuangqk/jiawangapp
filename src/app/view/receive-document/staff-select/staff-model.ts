export class Staff {
    id: string;
    name: string;
    position: string;
    departId: string;
    color: string;
    circleText: string;
    isSelected = false;

    public static parseJson(json: any) {
        const datas = new Array<Staff>();
        const colors: Array<string> = [
            '#f65e8d',
            '#78c06e',
            '#ff8e6b',
            '#f55e5d',
            '#3bc2b5',
            '#78c06e',
            '#c5cb63'
        ];
        let i = 0;
        const colorsCount = colors.length;
        for (const item of json) {
            const s = new Staff();
            s.id = item.id;
            s.name = item.name;
            s.position = item.position;
            s.departId = item.depart_id;
            s.color = colors[i % colorsCount];

            if (s.name.length <= 2) {
                s.circleText = s.name;
            } else if (s.name.length ===  3) {
                s.circleText = s.name.substring(1);
            } else if (s.name.length === 4) {
                s.circleText = s.name.substring(2);
            } else {
                s.circleText = s.name.substring(0, 2);
            }

            datas.push(s);

            i++;
        }
        return datas;
    }
}
