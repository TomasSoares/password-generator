"""
            Password Generator
Author: Tomás Soares
Created: 2024-10-20
Last Modified: 2024-10-22
Description: This script generates a random password using letters, numbers, and symbols.
"""
import random
import pyperclip

chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*().,?0123456789'
password = ""

print("="*40)
print("        PASSWORD GENERATOR        ")
print("="*40)

def get_yes_or_no_input(msg):
    while True:
        answer = input(msg).lower()
        if answer in ['y', 'n']:
            return answer
        else:
            print("Please enter 'Y' for Yes or 'N' for No.")

while True:
    while True:
        try:
            password_length = int(input("\nEnter the length of password: "))
            if password_length > 0:
                break
            else:
                print("Password length should be greater than 0")
        except ValueError:
            print("Please enter a valid number")

    for i in range(password_length):
        password += random.choice(chars)

    print("Password:\n", password)

    save_password = get_yes_or_no_input("\nDo you want to save the password to a file?\n(Y)es or (N)o: ")
    if save_password == "y":
        with open("password.txt", "a") as file:
            file.write(password + "\n")
        print("\nPassword saved to file password.txt")

    copy_to_clipboard = get_yes_or_no_input("\nDo you want to copy the password to clipboard?\n(Y)es or (N)o: ")
    if copy_to_clipboard == "y":
        pyperclip.copy(password)
        print("\nPassword copied to clipboard")

    another_pass = get_yes_or_no_input("\nDo you want to generate another password?\n(Y)es or (N)o: ")
    if another_pass == "n":
        print("\nThank you for using Password Generator!")
        print("\nGoodbye!")
        input("\nPress Enter to exit...")
        break  
