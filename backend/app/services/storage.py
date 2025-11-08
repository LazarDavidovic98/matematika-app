import os
import shutil
from datetime import datetime
from pathlib import Path
from fastapi import UploadFile
from typing import Optional

class FileStorage:
    """Servis za upravljanje upload-ovanih fajlova"""
    
    def __init__(self, base_path: str = "uploads"):
        self.base_path = Path(base_path)
        self.base_path.mkdir(exist_ok=True)
        
        # Kreiranje poddirektorijuma
        self.materials_path = self.base_path / "materials"
        self.materials_path.mkdir(exist_ok=True)
        
        self.thumbnails_path = self.base_path / "thumbnails"  
        self.thumbnails_path.mkdir(exist_ok=True)
        
    def save_file(self, file: UploadFile, category: str = "materials") -> Optional[str]:
        """Čuva upload-ovani fajl i vraća putanju"""
        try:
            # Kreiranje jedinstvenog imena fajla
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{timestamp}_{file.filename}"
            
            # Odabir direktorijuma na osnovu kategorije
            if category == "materials":
                file_path = self.materials_path / filename
            elif category == "thumbnails":
                file_path = self.thumbnails_path / filename
            else:
                file_path = self.base_path / filename
                
            # Čuvanje fajla
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
                
            return str(file_path.relative_to(Path.cwd()))
            
        except Exception as e:
            print(f"Greška pri čuvanju fajla: {str(e)}")
            return None
            
    def delete_file(self, file_path: str) -> bool:
        """Briše fajl sa servera"""
        try:
            full_path = Path(file_path)
            if full_path.exists():
                full_path.unlink()
                return True
            return False
        except Exception as e:
            print(f"Greška pri brisanju fajla: {str(e)}")
            return False
            
    def get_file_url(self, file_path: str, base_url: str = "http://localhost:8000") -> str:
        """Generiše URL za pristup fajlu"""
        return f"{base_url}/files/{file_path}"

# Globalna instanca
file_storage = FileStorage()
