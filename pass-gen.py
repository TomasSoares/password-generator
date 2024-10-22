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
