import chalk, { ChalkInstance } from 'chalk';
import { format } from 'date-fns';
import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
	protected formatMessage(
		logLevel: LogLevel,
		message: unknown,
		pid: string,
		formattedLogLevel: string,
		contextMessage: string,
		timestampDiff: string,
	): string {
		const timestamp = format(new Date(), 'dd.MM.yyyy, HH:mm:ss');

		return (
			chalk.cyan(pid) +
			'' +
			timestamp +
			' | ' +
			formattedLogLevel +
			' | ' +
			contextMessage +
			' => ' +
			message +
			' ' +
			chalk.dim(timestampDiff)
		);
	}

	private getColoredLevel(level: LogLevel): string {
		const colorMap: Record<LogLevel, ChalkInstance> = {
			error: chalk.red,
			warn: chalk.yellow,
			log: chalk.green,
			verbose: chalk.blue,
			debug: chalk.magenta,
			fatal: chalk.bgRed.whiteBright,
		};

		return colorMap[level](`[${level.toUpperCase()}]`);
	}

	protected formatContext(context: string): string {
		return context ? chalk.yellow(`[${context}]`) : '';
	}

	protected printMessages(
		messages: unknown[],
		context?: string,
		logLevel: LogLevel = 'log',
		writeStreamType?: 'stdout' | 'stderr',
	) {
		const timestampDiff = this.updateAndGetTimestampDiff();
		const pid = this.formatPid(process.pid);
		const contextMessage = this.formatContext(String(context || this.context));
		const coloredLevel = this.getColoredLevel(logLevel);

		messages.forEach((message) => {
			const formattedMessage = this.formatMessage(
				logLevel,
				message,
				pid,
				coloredLevel,
				contextMessage,
				timestampDiff,
			);

			process[writeStreamType === 'stderr' ? 'stderr' : 'stdout'].write(`${formattedMessage}\n`);
		});
	}
}
