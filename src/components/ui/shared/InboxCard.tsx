import React, { useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../button";
import { BsPaperclip } from "react-icons/bs";
import { MdOutlineImage } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { CgGirl } from "react-icons/cg";
import { cn } from "@/lib/utils";

export interface Message {
  id: string | number;
  sender: string;
  content: string;
  timestamp: Date;
  status: "pending" | "sent" | "failed";
  avatar?: string | null;
}

interface InboxCardProps {
  chatTitle?: string;
  initialMessages?: Message[];
  currentUser?: string;
  onSendMessage?: (message: Message) => Promise<boolean>;
  className?: string;
}

const InboxCard: React.FC<InboxCardProps> = ({
  chatTitle = "Company Chat",
  initialMessages = [],
  currentUser = "You",
  onSendMessage,
  className,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Adjust textarea height based on content
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    adjustTextareaHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file attachment
      const updatedMessage = newMessage + ` [File attached: ${file.name}]`;
      setNewMessage(updatedMessage);
    }
  };

  const handleImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      // Handle image attachment
      const updatedMessage = newMessage + ` [Image attached: ${image.name}]`;
      setNewMessage(updatedMessage);
    }
  };

  const handleEmojiSelected = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const simulateMessageSending = async (
    messageId: string | number
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.1;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, status: success ? "sent" : "failed" }
              : msg
          )
        );

        resolve(success);
      }, 1500);
    });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Create temporary message with pending state
    const tempId = Date.now().toString();
    const newMsg: Message = {
      id: tempId,
      sender: currentUser,
      content: newMessage,
      timestamp: new Date(),
      status: "pending",
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      if (onSendMessage) {
        const success = await onSendMessage(newMsg);
        if (success) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === tempId ? { ...msg, status: "sent" } : msg
            )
          );
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === tempId ? { ...msg, status: "failed" } : msg
            )
          );
        }
      } else {
        // Use mock API
        await simulateMessageSending(tempId);
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { ...msg, status: "failed" } : msg
        )
      );

      toast.error("Failed to send message", {
        description:
          error instanceof Error ? error.message : "Please try again later",
        duration: 3000,
      });
    }
  };

  const handleRetry = async (messageId: string | number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, status: "pending" } : msg
      )
    );

    try {
      const messageToRetry = messages.find((msg) => msg.id === messageId);

      if (messageToRetry && onSendMessage) {
        const success = await onSendMessage(messageToRetry);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, status: success ? "sent" : "failed" }
              : msg
          )
        );
      } else {
        // Simulate retry API call
        await simulateMessageSending(messageId);
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: "failed" } : msg
        )
      );
      // Show error toast notification
      toast.error("Failed to send message", {
        description:
          error instanceof Error ? error.message : "Please try again later",
        duration: 3000,
      });
    }
  };

  const emojis = ["😀", "😂", "😊", "👍", "🎉", "❤️", "👏", "🙏"];

  return (
    <div className="flex flex-col h-full w-full rounded-lg overflow-hidden">
      <h2 className="max-lg:text-center text-xl font-semibold mt-2">
        {chatTitle}
      </h2>

      <div className={cn("p-3 h-96 overflow-auto overflowY", className)}>
        <div className="relative flex items-end bg-gray-lite border rounded-lg p-1.5 focus-within:ring-2 focus-within:ring-gray-dark">
          <textarea
            ref={textareaRef}
            value={newMessage}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="flex-1 py-3 px-4 outline-none resize-none min-h-24 h-24 max-h-24"
          />
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              onClick={handleFileUpload}
              className="p-1 rounded-full hover:bg-gray-100 mr-0"
              variant={"ghost"}
            >
              <BsPaperclip className="h-5 w-5 text-charcoal" />
            </Button>
            <Button
              type="button"
              onClick={handleImageUpload}
              className="p-1 rounded-full hover:bg-gray-100 mr-0"
              variant={"ghost"}
            >
              <MdOutlineImage className="h-5 w-5 text-charcoal" />
            </Button>
            <Button
              type="button"
              onClick={toggleEmojiPicker}
              className="p-1 mr-0 rounded-full hover:bg-gray-100"
              variant={"ghost"}
            >
              <FaRegSmile className="h-5 w-5 text-charcoal " />
            </Button>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelected}
            className="hidden"
          />

          {/* Hidden image input */}
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageSelected}
            className="hidden"
          />

          {/* Simple emoji picker */}
          {showEmojiPicker && (
            <div className="absolute -bottom-24 right-0 bg-white p-2 shadow-lg rounded-lg border grid grid-cols-4 gap-2 z-10">
              {emojis.map((emoji, index) => (
                <Button
                  key={index}
                  type="button"
                  onClick={() => handleEmojiSelected(emoji)}
                  className="text-xl hover:bg-gray-100 p-1 mr-0 rounded"
                  variant={"ghost"}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 py-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex bg-gray-dark py-2 px-2 rounded-full relative ${
                message.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-center max-w-md ${
                  message.sender === currentUser
                    ? "flex-row-reverse"
                    : "flex-row"
                }`}
              >
                <div className="bg-white rounded-full size-12 border border-black flex items-center justify-center">
                  <CgGirl className="size-11" />
                </div>

                <div
                  className={`mx-2 ${
                    message.sender === currentUser ? "text-right" : "text-left"
                  }`}
                >
                  {message.sender !== currentUser && (
                    <div className="bg-charcoal text-white text-xs px-3 py-1 mt-3 rounded-4xl inline-block mb-1 absolute right-6 -top-6">
                      {message.sender}
                    </div>
                  )}
                  <div
                    className={`px-4 text-sm ${
                      message.status === "failed" ? "border border-red-500" : ""
                    }`}
                  >
                    {message.content}
                    {message.status === "pending" && (
                      <span className="ml-2 inline-flex">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </span>
                    )}
                  </div>
                  {message.status === "failed" && (
                    <button
                      onClick={() => void handleRetry(message.id)}
                      className="text-xs text-red-600 mt-1 hover:underline"
                    >
                      Retry
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InboxCard;
