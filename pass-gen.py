import random

chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*().,?0123456789'
password = ''
password_length = int(input("Enter the length of password: "))

for i in range(password_length):
    password += random.choice(chars)

print("Password:\n",password)
