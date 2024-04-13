
const exampleMessages = [
  {
    heading: 'Who is Kelvin kiprotich',
    subheading: 'Get to know me as a developer?',
    message: `Who is Kelvin kiprotich?`
  },
  {
    heading: 'What is the price of developing AI',
    subheading: 'AI development',
    message: 'What is the price of developing AI'
  }
]

export interface EmptyScreenProps {
  updateChat: (value: string) => void
}

export function EmptyScreen({updateChat}: EmptyScreenProps) {
    return (
      <div>
         <div className="mx-auto max-w-2xl px-4">
            <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
              <h1 className="text-lg font-semibold">
                Welcome this is 🤖 Kips Assistant
              </h1>
      
              <p className="leading-normal text-muted-foreground">
              I can take questions for Kelvin Kiprotich and can offer more
              details about who he is as a person. 
              </p>
            </div>
        </div>

        <div className="mx-auto sm:max-w-2xl sm:px-4 mt-4">
            <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
              {exampleMessages.map((example, index) => (
                  <div
                    key={example.heading}
                    className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                      index > 1 && 'hidden md:block'
                    }`}
                    onClick={() => {   updateChat(example.message)}}
                  >
                  <div className="text-sm font-semibold">{example.heading}</div>
                  <div className="text-sm text-zinc-600">
                    {example.subheading}
                  </div>
                </div>
              ))}
            </div>
        </div>

      </div>
     
    )
  }
  