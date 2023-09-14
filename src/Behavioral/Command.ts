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
		console.log(`Simple Command: ${this.payload}`);
	}
}

class CmplxCmd implements Cmd {
	private receiver: Receiver;
	private readonly a: string;
	private readonly b: string;

	constructor(receiver: Receiver, a: string, b: string) {
		this.receiver = receiver;
		this.a = a;
		this.b = b;
	}

	public exe(): void {
		console.log(`Complex Command: Complex stuff should be done by a receiver obj...`);
		this.receiver.do_sth(this.a);
		this.receiver.do_sth_else(this.b);
	}
}

class Receiver {
	public do_sth(value: string): void {
		console.log(`Receiver: working on ${value}`);
	}

	public do_sth_else(value: string): void {
		console.log(`Receiver: also working on ${value}`);
	}
}

class Invoker {
	private on_start: Cmd | undefined;
	private on_finish: Cmd | undefined;

	public set_on_start(cmd: Cmd): void {
		this.on_start = cmd;
	}
	public set_on_finish(cmd: Cmd): void {
		this.on_finish = cmd;
	}

	public do_sth_important(): void {
		console.log(`Invoker: before start...`);
		if (this.is_cmd(this.on_start)) {
			this.on_start.exe();
		}
		console.log('Doing important things');
		console.log(`Invoker: after finish...`);
		if (this.is_cmd(this.on_finish)) {
			this.on_finish.exe();
		}
	}

	private is_cmd(obj: any): obj is Cmd {
		return obj.exe !== undefined;
	}
}

const invoker = new Invoker();
const receiver = new Receiver();

invoker.set_on_start(new SmplCmd('Hey'));
invoker.set_on_finish(new CmplxCmd(receiver, 'send email', 'save report'));

invoker.do_sth_important();
