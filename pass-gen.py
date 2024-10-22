"""
            Password Generator
Author: John Doe
Created: 2024-10-20
Last Modified: 2024-10-22
Description: This script generates a random password using letters, numbers, and symbols.
"""
import random

chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*().,?0123456789'
password = ''
password_length = int(input("Enter the length of password: "))

while(password_length <= 0):
    print("Password length should be greater than 0")
    password_length = int(input("Enter the length of password: "))

for i in range(password_length):
    password += random.choice(chars)

print("Password:\n",password)
