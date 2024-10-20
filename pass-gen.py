import random

chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*().,?0123456789'
password = ''
password_length = 16

for j in range(password_length):
    password += random.choice(chars)

print("Password:\n",password)
