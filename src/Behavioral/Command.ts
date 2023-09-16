// Execute   --> Exe
// Command   --> Cmd
// Simple 	 --> Smpl
// Complex	 --> Cmplx
// Something --> Sth

interface Cmd {
	exe(): void;
}

class SmplCmd implements Cmd {
	private readonly payload: string;
	constructor(payload: string) {
		this.payload = payload;
	}

	public exe(): void {
		console.log(`SmplCmd: ${this.payload}`);
	}
}

class CmplxCmd implements Cmd {
	private readonly a: string;
	private readonly b: string;
	private receiver: Receiver;

	constructor(receiver: Receiver, a: string, b: string) {
		this.receiver = receiver;
		this.a = a;
		this.b = b;
	}

	public exe(): void {
		console.log(`CmplxCmd: Calling receiver to do things...`);
		this.receiver.do_sth(this.a);
		this.receiver.do_sth_else(this.b);
	}
}

class Receiver {
	public do_sth(value: string): void {
		console.log(`Receiver: Doing something --> (${value})`);
	}
	public do_sth_else(value: string): void {
		console.log(`Receiver: Doing something else --> (${value})`);
	}
}

class Invoker {
	private on_start: Cmd | undefined;
	private on_finish: Cmd | undefined;

	public set_on_start(cmd: cmd): void {
		this.on_start = cmd;
	}
	public set_on_finish(cmd: cmd): void {
		this.on_finish = cmd;
	}

	public do_sth_crazy(): void {
		const validation = {
			start: this.is_cmd(this.on_start),
			finish: this.is_cmd(this.on_finish)
		};

		if (validation.start) {
			console.log("Before starting, let's do something first...");
			this.on_start?.exe();
		}
		console.log('Invoker: Doing something SUPER WILD');
		if (validation.finish) {
			console.log("After finishing, there's something have to run before exit...");
			this.on_finish?.exe();
		}
	}

	private is_cmd(obj: any): obj is Cmd {
		return obj.exe !== undefined;
	}
}

const receiver = new Receiver();
const invoker = new Invoker();

invoker.set_on_start(new SmplCmd('Hello, good morning'));
invoker.set_on_finish(new CmplxCmd(receiver, 'The payload has unlocked', 'This game ends now!'));

invoker.do_sth_crazy();
