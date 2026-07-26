package com.streamversex.backend.mapper;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;

import com.streamversex.backend.dto.response.CastResponseDTO;
import com.streamversex.backend.dto.response.CrewResponseDTO;
import com.streamversex.backend.dto.response.MovieCreditsResponseDTO;
import com.streamversex.backend.dto.response.MovieDetailsResponseDTO;
import com.streamversex.backend.dto.response.MovieResponseDTO;
import com.streamversex.backend.dto.response.VideoResponseDTO;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbCreditsResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbMovieDTO;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbMovieDetailsDTO;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbVideoResponse;




@Component
public class MovieMapper {

    private static final String IMAGE_BASE_URL =
            "https://image.tmdb.org/t/p/w500";

    private static final String BACKDROP_BASE_URL =
            "https://image.tmdb.org/t/p/original";

    public MovieResponseDTO toResponseDTO(TmdbMovieDTO movie) {

        return MovieResponseDTO.builder()
                .id(movie.getId())
                .title(movie.getTitle())
                .overview(movie.getOverview())
                .posterUrl(buildPosterUrl(movie.getPosterPath()))
                .backdropUrl(buildBackdropUrl(movie.getBackdropPath()))
                .releaseDate(movie.getReleaseDate())
                .rating(movie.getVoteAverage())
                .voteCount(movie.getVoteCount())
                .genreIds(movie.getGenreIds())
                .build();
    }
    
    
    public MovieDetailsResponseDTO toDetailsResponseDTO(
            TmdbMovieDetailsDTO movie) {

        return MovieDetailsResponseDTO.builder()
                .id(movie.getId())
                .title(movie.getTitle())
                .originalTitle(movie.getOriginalTitle())
                .overview(movie.getOverview())
                .tagline(movie.getTagline())
                .posterUrl(buildPosterUrl(movie.getPosterPath()))
                .backdropUrl(buildBackdropUrl(movie.getBackdropPath()))
                .releaseDate(movie.getReleaseDate())
                .runtime(movie.getRuntime())
                .status(movie.getStatus())
                .rating(movie.getVoteAverage())
                .voteCount(movie.getVoteCount())
                .originalLanguage(movie.getOriginalLanguage())
                .imdbId(movie.getImdbId())
                .genres(
                        movie.getGenres() == null
                                ? Collections.emptyList()
                                : movie.getGenres()
                                        .stream()
                                        .map(genre -> genre.getName())
                                        .toList()
                )
                .build();
    }

    
    public MovieCreditsResponseDTO toCreditsResponseDTO(
            TmdbCreditsResponse credits) {

        if (credits == null) {
            return MovieCreditsResponseDTO.builder()
                    .cast(List.of())
                    .crew(List.of())
                    .build();
        }

        List<CastResponseDTO> cast =
                credits.getCast() == null
                        ? List.of()
                        : credits.getCast()
                                .stream()
                                .sorted((a, b) -> Integer.compare(
                                        a.getOrder() != null ? a.getOrder() : Integer.MAX_VALUE,
                                        b.getOrder() != null ? b.getOrder() : Integer.MAX_VALUE
                                ))
                                .limit(20)
                                .map(person -> CastResponseDTO.builder()
                                        .id(person.getId())
                                        .name(person.getName())
                                        .character(person.getCharacter())
                                        .profileUrl(buildProfileUrl(
                                                person.getProfilePath()))
                                        .build())
                                .toList();

        List<CrewResponseDTO> crew =
                credits.getCrew() == null
                        ? List.of()
                        : credits.getCrew()
                                .stream()
                                .filter(person ->
                                        "Director".equalsIgnoreCase(person.getJob())
                                        || "Producer".equalsIgnoreCase(person.getJob())
                                        || "Executive Producer".equalsIgnoreCase(person.getJob())
                                        || "Screenplay".equalsIgnoreCase(person.getJob())
                                        || "Writer".equalsIgnoreCase(person.getJob())
                                )
                                .map(person -> CrewResponseDTO.builder()
                                        .id(person.getId())
                                        .name(person.getName())
                                        .job(person.getJob())
                                        .department(person.getDepartment())
                                        .profileUrl(buildProfileUrl(
                                                person.getProfilePath()))
                                        .build())
                                .toList();

        return MovieCreditsResponseDTO.builder()
                .movieId(credits.getId())
                .cast(cast)
                .crew(crew)
                .build();
    }
    
    
    public List<VideoResponseDTO> toVideoResponseDTOs(
            TmdbVideoResponse response) {

        if (response == null || response.getResults() == null) {
            return List.of();
        }

        return response.getResults()
                .stream()

                // We currently support YouTube videos
                .filter(video ->
                        "YouTube".equalsIgnoreCase(video.getSite()))

                // Keep trailers and teasers
                .filter(video ->
                        "Trailer".equalsIgnoreCase(video.getType())
                        || "Teaser".equalsIgnoreCase(video.getType()))

                // Official videos first
                .sorted((a, b) ->
                        Boolean.compare(
                                Boolean.TRUE.equals(b.getOfficial()),
                                Boolean.TRUE.equals(a.getOfficial())
                        ))

                .map(video -> VideoResponseDTO.builder()
                        .id(video.getId())
                        .name(video.getName())
                        .key(video.getKey())
                        .site(video.getSite())
                        .type(video.getType())
                        .official(video.getOfficial())
                        .videoUrl(buildYouTubeUrl(video.getKey()))
                        .build())

                .toList();
    }
    
    private String buildPosterUrl(String path) {

        if (path == null || path.isBlank()) {
            return null;
        }

        return IMAGE_BASE_URL + path;
    }

    private String buildBackdropUrl(String path) {

        if (path == null || path.isBlank()) {
            return null;
        }

        return BACKDROP_BASE_URL + path;
    }
    
    private String buildProfileUrl(String path) {

        if (path == null || path.isBlank()) {
            return null;
        }

        return IMAGE_BASE_URL + path;
    }
    
    private String buildYouTubeUrl(String key) {

        if (key == null || key.isBlank()) {
            return null;
        }

        return "https://www.youtube.com/watch?v=" + key;
    }
}