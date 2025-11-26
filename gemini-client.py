import asyncio
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

from mcp_use import MCPAgent, MCPClient


async def run_multimodel_chat():
    """Run a chat using MCPAgent with both weather and filesystem servers."""
    # Load environment variables for API keys
    load_dotenv()

    # Ensure GOOGLE_API_KEY is set
    if not os.getenv("GOOGLE_API_KEY"):
        print("Error: GOOGLE_API_KEY environment variable is not set.")
        print("Please create a .env file with your Google AI API key:")
        print("GOOGLE_API_KEY=your_api_key_here")
        return

    # Config file path
    config_file = "./config.json"

    print("Initializing multimodel MCP chat...")
    print("Available servers: weather, filesystem")

    try:
        # Create MCP client and agent with memory enabled
        client = MCPClient.from_config_file(config_file)
        llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro")

        # Create agent with memory enabled
        agent = MCPAgent(
            llm=llm,
            client=client,
            max_steps=15,
            memory_enabled=True,  # Enable built-in conversation memory
        )

        print("\n===== Multimodel MCP Chat with Gemini AI =====")
        print("You can now interact with both weather and file system operations!")
        print("\nExamples:")
        print("- Get weather alerts: 'What weather alerts are there for California?'")
        print("- Read a file: 'Read the contents of README.md'")
        print("- List directory: 'Show me the files in the current directory'")
        print("- Write to file: 'Create a new file called test.txt with content Hello World'")
        print("\nCommands:")
        print("- Type 'exit' or 'quit' to end the conversation")
        print("- Type 'clear' to clear conversation history")
        print("- Type 'help' for examples")
        print("================================================\n")

        try:
            # Main chat loop
            while True:
                # Get user input
                user_input = input("\nYou: ")

                # Check for exit command
                if user_input.lower() in ["exit", "quit"]:
                    print("Ending conversation...")
                    break

                # Check for clear history command
                if user_input.lower() == "clear":
                    agent.clear_conversation_history()
                    print("Conversation history cleared.")
                    continue

                # Check for help command
                if user_input.lower() == "help":
                    print("\nAvailable operations:")
                    print("🌤️ Weather:")
                    print("  - Get weather alerts for a state")
                    print("  - Get forecast for coordinates")
                    print("📁 File System:")
                    print("  - Read file contents")
                    print("  - Write to files")
                    print("  - List directory contents")
                    print("  - Create directories")
                    print("  - Delete files")
                    print("  - Get file information")
                    continue

                # Get response from agent
                print("\nAssistant: ", end="", flush=True)

                try:
                    # Run the agent with the user input (memory handling is automatic)
                    response = await agent.run(user_input)
                    print(response)

                except Exception as e:
                    print(f"\nError: {e}")

        finally:
            # Clean up
            if client and client.sessions:
                await client.close_all_sessions()

    except FileNotFoundError:
        print(f"Error: Configuration file '{config_file}' not found.")
        print("Make sure the config.json file exists in the current directory.")
    except Exception as e:
        print(f"Error initializing chat: {e}")


if __name__ == "__main__":
    asyncio.run(run_multimodel_chat())
