import pinoPretty, { PrettyOptions } from 'pino-pretty';

export default function (opts: PrettyOptions) {
  return pinoPretty({
    ...opts,
    messageFormat(log, messageKey) {
      const reqId = log.reqId ? `<RQ:${log.reqId}> |` : '';
      const context = log.context ? `[${log.context || ''}]` : '';
      const msg = log[messageKey];
      return [reqId, context, msg].join(' ');
    },
    ignore: 'context,reqId,hostname,pid',
  });
}
