import gpxpy
import gpxpy.gpx
import math
import matplotlib.pyplot as plt
import numpy as np
import os, glob

plot_path = "../../client/public/elevation-plots/"
trail_path = '../public/trails/traces'

def distance(origin, destination):
    R = 6373.0

    lat1, lon1 = origin
    lat2, lon2 = destination
    radius = 6371 # km

    dlat = math.radians(lat2-lat1)
    dlon = math.radians(lon2-lon1)
    a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(math.radians(lat1)) \
        * math.cos(math.radians(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    d = radius * c

    return d


def parse_file(gpx_file):
    gpx = gpxpy.parse(gpx_file)
    elevations = []
    distances = [0]
    points = []

    for track in gpx.tracks:
        for segment in track.segments:
            for point in segment.points:
                elevations.append(point.elevation)
                points.append((point.latitude, point.longitude))

    pairs = zip(points[:-1], points[1:])

    for pair in list(pairs):
        distances.append(distance(pair[0], pair[1]))

    return (np.cumsum(distances), elevations)


def plot_trace(distances, elevations, file_name):
    mean_elev=round((sum(elevations)/len(elevations)),3)
    min_elev=round(min(elevations),2)
    max_elev=round(max(elevations),2)
    distance=distances[-1]
    base_reg= min_elev - (max_elev - min_elev) / 6

    plt.figure(figsize=(8,6))
    plt.plot(distances, elevations)

    plt.plot([0,distance],[min_elev,min_elev],'--g',label='min: '+str(min_elev)+' m')
    plt.plot([0,distance],[max_elev,max_elev],'--b',label='max: '+str(max_elev)+' m')
    # plt.plot([0,distance],[mean_elev,mean_elev],'--y',label='ave: '+str(mean_elev)+' m')

    plt.fill_between(distances,elevations,base_reg, alpha=0.1, color="green")

    plt.xlabel("Distance(km)")
    plt.ylabel("Elevation(m)")
    plt.grid(linestyle='--')
    plt.legend(fontsize='small')
    # plt.show()

    plt.savefig(plot_path + file_name + ".jpg", dpi=150)
    plt.close()


for file_path in glob.glob(os.path.join(trail_path, '*.gpx')):
    try:
        with open(file_path, encoding="utf8") as gpx_file:
            file_name = os.path.splitext(os.path.basename(file_path))[0]
            distances, elevations = parse_file(gpx_file)
            plot_trace(distances, elevations, file_name)
    except:
        f = open(plot_path + "log.txt","w+")
        f.write(file_name)
        f.close()
        continue
  

