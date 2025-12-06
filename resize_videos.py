#!/usr/bin/env python3
"""
Script to resize videos in the public/videos folder to either:
- 886 × 1920px (portrait) or 
- 1920 × 886px (landscape)

The script automatically determines the orientation based on the current video aspect ratio.
"""

import subprocess
import json
import os
from pathlib import Path

# Target dimensions
PORTRAIT_WIDTH = 886
PORTRAIT_HEIGHT = 1920
LANDSCAPE_WIDTH = 1920
LANDSCAPE_HEIGHT = 886

VIDEOS_DIR = Path(__file__).parent / "public" / "videos"

def get_video_dimensions(video_path):
    """Get video width and height using ffprobe."""
    try:
        cmd = [
            'ffprobe',
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_streams',
            str(video_path)
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        data = json.loads(result.stdout)
        
        for stream in data.get('streams', []):
            if stream.get('codec_type') == 'video':
                width = int(stream.get('width', 0))
                height = int(stream.get('height', 0))
                return width, height
        
        return None, None
    except Exception as e:
        print(f"Error getting dimensions for {video_path}: {e}")
        return None, None

def resize_video(input_path, output_path, width, height):
    """Resize video using ffmpeg."""
    try:
        # Create output directory if it doesn't exist
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        cmd = [
            'ffmpeg',
            '-i', str(input_path),
            '-vf', f'scale={width}:{height}:force_original_aspect_ratio=decrease,pad={width}:{height}:(ow-iw)/2:(oh-ih)/2',
            '-c:v', 'libx264',
            '-preset', 'medium',
            '-crf', '23',
            '-c:a', 'copy',
            '-y',  # Overwrite output file if it exists
            str(output_path)
        ]
        
        print(f"\nResizing {input_path.name} to {width}×{height}px...")
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(f"✓ Successfully resized {input_path.name}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ Error resizing {input_path.name}: {e.stderr}")
        return False
    except Exception as e:
        print(f"✗ Error resizing {input_path.name}: {e}")
        return False

def main():
    """Main function to resize all videos in the videos folder."""
    if not VIDEOS_DIR.exists():
        print(f"Error: Videos directory not found at {VIDEOS_DIR}")
        return
    
    video_files = list(VIDEOS_DIR.glob('*.MP4')) + list(VIDEOS_DIR.glob('*.mp4'))
    
    if not video_files:
        print(f"No video files found in {VIDEOS_DIR}")
        return
    
    print(f"Found {len(video_files)} video(s) to process...")
    
    for video_path in video_files:
        print(f"\n{'='*60}")
        print(f"Processing: {video_path.name}")
        print(f"{'='*60}")
        
        # Get current dimensions
        width, height = get_video_dimensions(video_path)
        
        if width is None or height is None:
            print(f"⚠ Could not determine dimensions for {video_path.name}. Skipping...")
            continue
        
        print(f"Current dimensions: {width} × {height}px")
        aspect_ratio = width / height
        
        # Determine target dimensions based on aspect ratio
        # If width > height (landscape), use landscape dimensions
        # If height > width (portrait), use portrait dimensions
        if aspect_ratio >= 1.0:
            target_width = LANDSCAPE_WIDTH
            target_height = LANDSCAPE_HEIGHT
            orientation = "landscape"
        else:
            target_width = PORTRAIT_WIDTH
            target_height = PORTRAIT_HEIGHT
            orientation = "portrait"
        
        print(f"Target dimensions: {target_width} × {target_height}px ({orientation})")
        
        # Create output filename
        output_path = video_path.parent / f"{video_path.stem}_resized{video_path.suffix}"
        
        # Resize the video
        success = resize_video(video_path, output_path, target_width, target_height)
        
        if success:
            original_size = video_path.stat().st_size / (1024 * 1024)  # MB
            new_size = output_path.stat().st_size / (1024 * 1024)  # MB
            print(f"Original size: {original_size:.2f} MB")
            print(f"New size: {new_size:.2f} MB")
    
    print(f"\n{'='*60}")
    print("Processing complete!")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()

