-- This script loads Better Teknikk V3 (BT3) into your game
-- BT only works if you installed BT via the BT Installer!

local BT3MainModule
local BT3MainModuleBackup

local success,error = pcall(function()
	BT3MainModule = require(14165168309)
end)

if BT3MainModule then
	BT3MainModule:LoadBT3()
else
	local success,error = pcall(function()
		BT3MainModuleBackup = require(124583242185327)
	end)
	
	if BT3MainModuleBackup then
		BT3MainModuleBackup:LoadBT3()
	else
		task.wait(5)
		warn("BT3 MainModule failed to load!")
		
		for i,a in pairs(workspace:GetDescendants()) do
			local BTAPI = a:IsA("BindableFunction") and (a.Name == "BT-API" or a.Name == "BT-API1")

			if BTAPI then
				task.spawn(function()
					BTAPI:Invoke("Start")
				end)
			end
		end
	end
end
