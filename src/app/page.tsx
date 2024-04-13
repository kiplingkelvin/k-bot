"use client"

import { useEffect, useRef, useState } from 'react'
import { Message } from '@/libs/type'
import { ChatMessageScreen } from '@/components/chat-page'
import { EmptyScreen } from '@/components/empty-page'
import { OpenAiPOST } from '@/action/open-ai'


export default function Home() {

  const [messages, setMessages] = useState<Message[]>([]);
    const [botTyping, setBotTyping] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const addChat = async (input: string)  => {
        //Set user message
        setMessages(messages => [...messages, { role: 'user', content: input }]);

        //Set typing to true
        setBotTyping(true)
        //Send the message to OpenAI
        let botResponse = await OpenAiPOST([...messages, { role: 'user', content: input }])
        //set typing to false once the response is back
        setBotTyping(false)
        //Append the assistant message to the chat
        setMessages(messages => [...messages, { role: 'assistant', content: botResponse }]);

    };

    //Scroll to the recent message
    const scrollChat = (): void => {
        const messagesContainer: HTMLElement | null = document.getElementById("messages");
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
            setTimeout(() => {
                if (messagesContainer) {
                    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
                }
            }, 100);
        }
    };

    const updateChat = (input: string): void => {
        if (input) {
            if (inputRef.current) {
                inputRef.current.value = '';
            }

            addChat(input)
        }
    };

    useEffect(() => {
        scrollChat();
    }, [messages]);


  return (
    <div className="mx-auto max-w-2xl px-4 bg-black" >
       <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen bg-black">

          {messages.length ? (
                    <ChatMessageScreen messages={messages} botTyping={botTyping} />
            ) : (
                    <EmptyScreen updateChat={updateChat} />
          )}

            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-14 sm:mb-0">
                <div className="relative flex">
                    <input type="text" placeholder="Say something..." autoComplete="off" autoFocus={true} onKeyDown={(e) => e.key === 'Enter' && updateChat(e.currentTarget.value.trim())} className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 rounded-full py-2" ref={inputRef} />
                    <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
                        <button type="button" className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white bg-white focus:outline-none" onClick={() => inputRef.current && updateChat(inputRef.current.value.trim())}>
                            <img width="50" height="50" src="https://img.icons8.com/ios/50/circled-chevron-right--v1.png" alt="circled-chevron-right--v1"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
