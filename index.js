local HttpService = game:GetService("HttpService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local chatService = game:GetService("Chat")

local function getEgirlResponse(playerMessage)
	local url = "SUA_URL_DA_API_AQUI"
	local data = {
		message = playerMessage,
		personality = "sem teto"
	}

	local jsonData = HttpService:JSONEncode(data)

	local response = HttpService:PostAsync(url, jsonData, Enum.HttpContentType.ApplicationJson)
	local decoded = HttpService:JSONDecode(response)

	return decoded.text -- A resposta da IA
end

local function NPCChat(npc, message)
	chatService:Chat(npc.Head or npc.PrimaryPart or npc, message, Enum.ChatColor.Green)
end

ReplicatedStorage.Remotes.NPCMessage.OnServerEvent:Connect(function(player, message)
	local response = getEgirlResponse(message)
	print("E-girl diz: " .. response)
	-- Faça o NPC falar a resposta

	NPCChat(script.Parent, response)
end)
