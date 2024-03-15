def interpret(code):
    array = [0]
    pointerLocation = 0
    i = 0
    print(code)
    loop_starts = []  # Liste pour stocker les indices de départ des boucles
    
    while i < len(code):
        command = code[i]
        
        if command == '<':
            pointerLocation = max(0, pointerLocation - 1)
        elif command == '>':
            pointerLocation += 1
            if len(array) <= pointerLocation:
                array.append(0)
        elif command == '+':
            array[pointerLocation] += 1
        elif command == '-':
            array[pointerLocation] -= 1
        elif command == '.':
            print(chr(array[pointerLocation]), end="")
        elif command == ',':
            x = input("Input:")
            try:
                y = int(x)
            except ValueError:
                y = ord(x)
            array[pointerLocation] = y
        elif command == '[':
            if array[pointerLocation] == 0:
                loop_depth = 1
                while loop_depth > 0:
                    i += 1
                    if code[i] == '[':
                        loop_depth += 1
                    elif code[i] == ']':
                        loop_depth -= 1
            else:
                loop_starts.append(i)
        elif command == ']':
            if array[pointerLocation] != 0:
                i = loop_starts[-1]
            else:
                loop_starts.pop()
        i += 1

interpret("""

Written by Erik Bosman

-->+++>+>+>+>+++++>++>++>->+++>++>+>>>>>>>>>>>>>>>>->++++>>>>->+++>+++>+++>+++>+++>+++>+>+>>>->->>++++>+>>>>->>++++>+>+>>->->++>++>++>++++>+>++>->++>++++>+>+>++>++>->->++>++>++++>+>+>>>>>->>->>++++>++>++>++++>>>>>->>>>>+++>->++++>->->->+++>>>+>+>+++>+>++++>>+++>->>>>>->>>++++>++>++>+>+++>->++++>>->->+++>+>+++>+>++++>>>+++>->++++>>->->++>++++>++>++++>>++[-[->>+[>]++[<]<]>>+[>]<--[++>++++>]+[<]<<++]>>>[>]++++>++++[--[+>+>++++<<[-->>--<<[->-<[--->>+<<[+>+++<[+>>++<<]]]]]]>+++[>+++++++++++++++<-]>--.<<<]

""")
print("Done")
