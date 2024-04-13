import { Message } from '@/libs/type'

export interface ChatMessageScreenProps {
    messages: Message[],
    botTyping: boolean;
  }
  

export function ChatMessageScreen({messages, botTyping}: ChatMessageScreenProps) {
    return (
        <div>
            <div className="mx-auto max-w-2xl px-4">
                <div className="flex flex-col gap-2 rounded-lg border bg-background p-4">
                <h1 className="text-lg font-semibold">
                🤖 Kips Assistant
                </h1>
                </div>
            </div>

            <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                {messages.map((message, key) => (
                    <div key={key}>
                        <div className={`flex items-end ${message.role === 'assistant' ? '' : 'justify-end'}`}>
                            <div className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 ${message.role === 'assistant' ? 'order-2 items-start' : 'order-1 items-end'}`}>
                                <div>
                                    <span className={`px-4 py-3 rounded-xl inline-block ${message.role === 'assistant'? 'rounded-bl-none bg-gray-100 text-gray-600' : 'rounded-br-none bg-blue-500 text-white'}`} dangerouslySetInnerHTML={{ __html: message.content }}></span>
                                </div>
                            </div>
                            <img src={message.role === 'assistant' ? 'https://img.icons8.com/plasticine/100/bot.png' : 'https://img.icons8.com/windows/32/user.png'} alt="" className={`w-6 h-6 rounded-full bg-white ${message.role === 'assistant' ? 'order-1' : 'order-2'}`} />
                        </div>
                    </div>
                ))}
                <div style={{ display: botTyping ? 'block' : 'none' }}>
                    <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-md leading-tight mx-2 order-2 items-start">
                            <div><img src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif" alt="..." className="w-16 ml-6" /></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
       
    )
  }
  