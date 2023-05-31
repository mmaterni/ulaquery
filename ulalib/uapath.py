from pathlib import Path


def cwd() -> str:
    return Path.cwd().as_posix()


def home() -> str:
    return Path.home().as_posix()

def posix(path: str) -> str:
    return Path(path).as_posix()

def exists(path: str) -> bool:
    return Path(path).exists()

def remove_file(path: str) -> bool:
    p = Path(path)
    if not p.exists():
        return False
    p.unlink()
    return True

def remove_dir(dir_path: str):
    p = Path(dir_path)
    if not p.exists():
        return False
    for child in p.glob('*'):
        if child.is_file():
            child.unlink()
        else:
            remove_dir(child)
    p.rmdir()
    return True

def join(path0: str, path1: str) -> str:
    return Path(path0).joinpath(path1).as_posix()

def rlist_path(path: str, match: str) -> list:
    return [str(x) for x in Path(path).rglob(match)]

def list_path(path_x: str, match: str = None) -> list:
    p = Path(path_x)
    if match is None:
        lst = [str(x) for x in p.iterdir()]
    else:
        lst = [str(x) for x in p.glob(match)]
    return lst

def chmod(path: str, mode: int = 0o777):
    p = Path(path)
    p.chmod(mode=mode)

def make_dir(path: str, mode: int = 0o777):
    p = Path(path)
    p.mkdir(parents=True, exist_ok=True, mode=mode)
    p.chmod(mode=mode)

def rmake_dir(path: str, mode: int = 0o777):
    p_abs = Path(path).absolute()
    p_abs.mkdir(parents=True, exist_ok=True, mode=mode)
    p_abs.chmod(mode=mode)
    for p in p_abs.parents:
        p.chmod(mode=mode)

def make_dir_of_file(file_path: str, mode: int = 0o777):
    path_abs = Path(file_path).absolute()
    for p in path_abs.parents:
        p.mkdir(parents=True, exist_ok=True, mode=mode)
        p.chmod(mode=mode)
