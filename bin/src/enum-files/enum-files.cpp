#define UNICODE
#define _UNICODE

#include <windows.h>
#include <tchar.h>
#include <stdio.h>

int wmain(int argc, wchar_t** argv, wchar_t** envp) {
	printf("%d\n", argc);
	return 0;
}