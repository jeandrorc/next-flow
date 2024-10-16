export interface ProducerWinInterval {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export interface WinIntervalResponse {
    min: ProducerWinInterval[];
    max: ProducerWinInterval[];
}
